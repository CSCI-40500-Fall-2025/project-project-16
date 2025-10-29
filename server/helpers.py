"""
Note backend has not been settled, however these are helper functions here that will be USED later on, for example the comments and stuff!
"""
import re

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

#  regex expression to allow a-z and other letters with accents 
_NAME_REGEX = re.compile(r"^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ' -]{1,39}$", re.UNICODE)

def validate_name_input(name: str) -> bool:
    """
    Validate by:
        2 to 40 characters
        Starts with a letter
        May contain letters, hyphen (-), or apostrophe (')
        Supports accented letters
    """
    if not name:
        return False
    name = name.strip()
    if len(name) < 2 or len(name) > 40:
        return False
    return bool(_NAME_REGEX.fullmatch(name))

