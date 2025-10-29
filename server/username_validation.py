import pytest
from helpers import validate_name_input

class userNameValidateName:
    def test_valid_basic(self):
        assert validate_name_input("John") is True

    def test_valid_with_hyphen(self):
        assert validate_name_input("Anne-Marie") is True

    def test_valid_with_apostrophe(self):
        assert validate_name_input("O'Connor") is True

    def test_valid_with_accent(self):
        assert validate_name_input("José") is True

    def test_too_short(self):
        assert validate_name_input("J") is False

    def test_too_long(self):
        long_name = "A" * 41
        assert validate_name_input(long_name) is False

    def test_starts_with_nonletter(self):
        assert validate_name_input("-Anne") is False
        assert validate_name_input("'Connor") is False

    def test_invalid_chars(self):
        assert validate_name_input("John3") is False
        assert validate_name_input("John@Doe") is False
        assert validate_name_input("John_Doe") is False
        assert validate_name_input("John.Doe") is False

    def test_trailing_spaces(self):
        assert validate_name_input("  Alice  ") is True
