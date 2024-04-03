def find_common_prefix(strs):
    if not 1 <= len(strs) <= 200:
        raise ValueError("Number of strings should be between 1 and 200")

    for s in strs:
        if not 0 <= len(s) <= 200:
            raise ValueError("Length of each string should be between 0 and 200")
        if not s.islower():
            raise ValueError("Each string should consist only of lowercase English letters")

    if len(strs) == 1:
        return [""]

    # Find the shortest word in the list
    min_length = min(len(s) for s in strs)

    # Iterate through characters of the shortest word
    common_prefix = ""
    result = []
    for i in range(min_length):
        char = strs[0][i]
        # Check if the character exists at the same position in all words
        if all(char in word for word in strs):
            common_prefix += char
        else:
            break
    result.append(common_prefix)

    return result

# Prompt the user to input the list of strings separated by commas
input_str = input("Enter the words separated by commas: ")
# Split the input string to create the list of strings
strs = input_str.split(",")

try:
    # Find the longest common prefix among the input words
    common_prefixes = find_common_prefix(strs)
    # Print the longest common prefix
    print("Longest common prefix:", common_prefixes)
except ValueError as e:
    print("Error:", e)
