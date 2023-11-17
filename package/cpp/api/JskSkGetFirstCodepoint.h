#pragma once

#include <memory>
#include <numeric>
#include <utility>
#include <vector>


inline int32_t get_first_codepoint(const std::string &str) {
	int32_t codepoint = 0;
	int count = 0;
	for (char c : str) {
		if (count == 0) {
			if ((c & 0b10000000) == 0) {
				codepoint = c;
				break;
			} else if ((c & 0b11100000) == 0b11000000) {
				codepoint = c & 0b00011111;
			count = 1;
			} else if ((c & 0b11110000) == 0b11100000) {
				codepoint = c & 0b00001111;
				count = 2;
			} else if ((c & 0b11111000) == 0b11110000) {
				codepoint = c & 0b00000111;
				count = 3;
			} else {
				// Invalid UTF-8 sequence
				break;
			}
		} else {
			if ((c & 0b11000000) != 0b10000000) {
				// Invalid UTF-8 sequence
				break;
			}
			codepoint = (codepoint << 6) | (c & 0b00111111);
			count--;
		}
	}
	if (count != 0) {
		// Incomplete UTF-8 sequence
		codepoint = -1;
	}
	return codepoint;
}
