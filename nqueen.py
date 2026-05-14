def solvenqueens(n):
    col = set()
    postive_diag = set() #r+c
    negative_diag = set() #r-c

    res =[]
    board = [["."]*n for i in range(n)]

    def backtrack(r):
        if r == n:
            copy = ["".join(row) for row in board]
            res.append(copy)
            return res

        for c in range(n):
            if (c in col) or (r+c in postive_diag) or (r-c in negative_diag) :
                continue

            col.add(c)
            postive_diag.add(r+c)
            negative_diag.add(r-c)
            board[r][c] = "Q"

            backtrack(r+1)

            col.remove(c)
            postive_diag.remove(r+c)
            negative_diag.remove(r-c)
            board[r][c] = "."
    backtrack(0)
    return res

if __name__ == "__main__":
    result = solvenqueens(n=int(input()))
    if result:
        print(f"Number of solutions: {len(result)}")
        for solution in result:
            for row in solution:
                print(" ".join(row))
            print("_"*10)
    else:
        print("No solution possible")