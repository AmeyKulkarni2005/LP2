import heapq

#function to calculate h(n) using the Manhattan distance
#formula: |x1-x2| + |y1-y2|
def heuristic(current, target):
    return abs(current[0]-target[0])+abs(current[1]-target[1])


def astar(maze, start, target):
    rows, cols = len(maze), len(maze[0])

    #priority queue : {fscore, gscore, current cell, path}
    #start with gscore=0 for start
    pq = [(0+heuristic(start, target),0,start, [start])]

    #dictionary to track shortest path(gscore) t any cell
    best_path = {start:0}

    directions = [(0,1),(0,-1),(1,0),(-1,0)]

    while pq:
        fscore, gscore, curr, path = heapq.heappop(pq)
        #automatically pops cell with lowest score

        if curr == target:
            return path
        
        for dr, dc in directions:
            r,c = curr[0]+dr, curr[1]+dc
            neighbour = (r,c)
            # 1. Check if the neighbor is inside the maze boundaries
            # 2. Check if the neighbor is an open path (_), not a wall (|)

            if 0<=r<rows and 0<=c<cols and maze[r][c] == "_":
                new_gscore = gscore+1 #each move costs 1

                # If we've never seen this cell, OR we found a faster way to reach it
                if neighbour not in best_path or new_gscore< best_path[neighbour]:
                    best_path[neighbour] = new_gscore

                    new_fscore = new_gscore + heuristic(neighbour, target)

                    heapq.heappush(pq, (new_fscore, new_gscore, neighbour, path+[neighbour]))
    return None


def print_maze(maze, path):
    maze_copy = [row[:] for row in maze]

    if path:
        for r,c in path:
            if maze[r][c] == "_":
                maze_copy[r][c] = "*"
    for row in maze_copy:
        print(" ".join(row))

if __name__ == "__main__":
    # 1. Setup the Maze ("_" is open, "|" is wall)
    game_maze = [
        ["_", "|", "_", "_", "_"],
        ["_", "|", "_", "|", "_"],
        ["_", "_", "_", "|", "_"],
        ["_", "|", "|", "|", "_"],
        ["_", "_", "_", "_", "_"]
    ]
    print_maze(game_maze,[])
    
    # 2. Define Start and Target
    start_pos = (0, 0)
    target_pos = (0, 4)

    print(f"Executing A* Search from {start_pos} to {target_pos}...\n")

    # 3. Run the Algorithm
    winning_path = astar(game_maze, start_pos, target_pos)

    # 4. Print the Results
    if winning_path:
        print(f"SUCCESS! Path found in {len(winning_path) - 1} steps.")
        print("Coordinate sequence:")
        print(winning_path)
        print("\nVisualized Path (* indicates the route taken):")
        print_maze(game_maze, winning_path)
    else:
        print("FAILED: No valid path exists to the target.")