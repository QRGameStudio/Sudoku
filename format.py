#!/usr/bin/python3.7
# https://qqwing.com/generate.html

lines = [input() for _ in range(9)]

print("[")
for line in lines:
    print("[", end="")
    for i in range(9):
        print(line[i] if line[i] != "." else 0, end="," if i < 8 else "")
    print("],")
print("],")
