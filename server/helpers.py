"""
Note backend has not been settled, however these are helper functions here that will be USED later on, for example the comments and stuff!
"""

# take the bad word if it appears in the list: 
# ex: 'you darn animal' -> 'you #### animal'
# this will be used for COMMENTS .. to validate good comments 
def filter_bad_words(val: str) -> str:
    # bad words list
    bad_words = {"flip", "fitch", "damn", "darn"}

    words = val.split()  # split sentence into words
    result = []

    for w in words:
        # check lowercase version for case-insensitive match
        if w.lower() in bad_words:
            result.append("####")
        else:
            result.append(w)

    return " ".join(result)

#print(filter_bad_words("DARN you, goat gang"))

