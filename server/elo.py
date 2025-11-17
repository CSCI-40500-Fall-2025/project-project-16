import math

def expected_score(a, b):
    return 1 / (1 + 10 ** ((b - a) / 400))

# classic elo system, based off chess
def update_elo(winner_elo, loser_elo, k=32):
    expected_win = expected_score(winner_elo, loser_elo)
    expected_loss = expected_score(loser_elo, winner_elo)

    new_winner = winner_elo + k * (1 - expected_win)
    new_loser = loser_elo + k * (0 - expected_loss)

    return new_winner, new_loser
