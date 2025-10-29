import pytest
from helpers import filter_bad_words

class TestFilterBadWords:
    """Unit tests for the filter_bad_words function"""

    def test_single_bad_word(self):
        assert filter_bad_words("you darn animal") == "you #### animal"

    def test_multiple_bad_words(self):
        assert filter_bad_words("flip fitch damn") == "#### #### ####"

    def test_case_insensitivity(self):
        assert filter_bad_words("Darn you Flip") == "#### you ####"

    def test_sentence_with_no_bad_words(self):
        assert filter_bad_words("hello kind world") == "hello kind world"

    def test_partial_word_not_filtered(self):
        # "darned" isn't in the bad list
        assert filter_bad_words("that was darned close") == "that was darned close"

    def test_extra_spaces_handled(self):
        # split() collapses spaces — expected simplified output
        assert filter_bad_words("   flip   this  fitch  ") == "#### this ####"
