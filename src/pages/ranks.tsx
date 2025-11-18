// ...existing code...
import React, { useEffect, useState } from 'react'
import RankCard from '../component/RankCard'
import type { Artist } from '../types'

const Ranks: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [champion, setChampion] = useState<Artist | null>(null)
  const [challengerIndex, setChallengerIndex] = useState(1)
  const [finished, setFinished] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`http://127.0.0.1:5000/artists/random?count=20`)
      .then(res => { if (!res.ok) throw new Error(String(res.status)); return res.json() })
      .then((data: Artist[]) => {
        setArtists(data)
        setChampion(data[0] ?? null)
        setChallengerIndex(1)
        setFinished(false)
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  // send vote to backend and return parsed json
  const sendVote = async (winner_id: number, loser_id: number) => {
    const res = await fetch('http://127.0.0.1:5000/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ winner_id, loser_id })
    })
    if (!res.ok) throw new Error(`vote failed: ${res.status}`)
    return res.json()
  }

  const nextBattle = async (winnerIsChampion: boolean) => {
    if (!artists.length || champion == null) return
    const challenger = artists[challengerIndex]
    if (!challenger) return

    const winnerId = winnerIsChampion ? champion.id : challenger.id
    const loserId = winnerIsChampion ? challenger.id : champion.id

    try {
      // optimistic UI: advance champion locally while awaiting server
      const optimisticChampion = winnerIsChampion ? champion : challenger
      setChampion(optimisticChampion)

      const json = await sendVote(winnerId, loserId)
      // server returns { winner_new_elo, loser_new_elo }
      const winnerNewElo = json.winner_new_elo
      const loserNewElo = json.loser_new_elo

      // update local artists array elos
      setArtists(prev => prev.map(a => {
        if (a.id === winnerId) return { ...a, elo: winnerNewElo }
        if (a.id === loserId) return { ...a, elo: loserNewElo }
        return a
      }))

      // set champion according to actual winner (server confirmed)
      const newChampion = artists.find(a => a.id === winnerId) ?? optimisticChampion
      setChampion({ ...newChampion, elo: winnerNewElo } as Artist)

    } catch (err: any) {
      console.error('vote error', err)
      setError(String(err))
      // fallback: keep optimistic champion but do not advance if error
      return
    }

    if (challengerIndex + 1 >= artists.length) setFinished(true)
    else setChallengerIndex(challengerIndex + 1)
  }

  const restart = () => {
    setChampion(artists[0] ?? null)
    setChallengerIndex(1)
    setFinished(false)
    setError(null)
  }

  if (loading) return <div className="text-gray-300">Loading ranks…</div>
  if (error) return <div className="text-red-400">Error: {error}</div>
  if (!artists.length) return <div className="text-gray-300">No artists returned.</div>

  const challenger = artists[challengerIndex]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Ranks</h2>

      {!finished ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-400 mb-2">Current Champion</h3>
            {champion && <RankCard artist={champion} highlighted onSelect={() => void nextBattle(true)} selectLabel="Keep as winner" />}
          </div>

          <div>
            <h3 className="text-gray-400 mb-2">Challenger</h3>
            {challenger ? (
              <RankCard artist={challenger} onSelect={() => void nextBattle(false)} selectLabel="Pick challenger" />
            ) : (
              <div className="text-gray-400">No challenger</div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <h3 className="text-green-400 text-xl">Final Champion</h3>
          {champion && <RankCard artist={champion} highlighted={true} />}
          <div>
            <button onClick={restart} className="mt-2 px-4 py-2 rounded bg-green-500 text-black">Restart</button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-gray-400">All Artists (fetched)</h4>
        <div className="grid gap-2 mt-2">
          {artists.map((a) => (
            <div key={a.id} className="text-sm text-gray-300">
              {a.name} — {a.elo.toFixed(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ranks
// ...existing code...