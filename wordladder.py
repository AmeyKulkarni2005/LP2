from collections import deque



#this function returns neighbours ie words that are
#1 letter away
def get_neighbors(curr_word, word_list):
    neighbours = []
    for word in word_list:
        diff = sum(1 for a,b in zip(curr_word,word) if a!=b)

        if diff == 1:
            neighbours.append(word)
    
    return neighbours

def bfs(start, target, word_list):
    #Queue stores list of path
    queue = deque([[start]])

    visited = set([start])

    while queue:

        path = queue.popleft()
        curr_word = path[-1]

        if curr_word == target:
            print(f"BFS path: {'->'.join(path)}")
            return len(path)-1
        
        for neighbour in get_neighbors(curr_word,word_list):
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(path + [neighbour])
        
    print("No path found")
    return -1 #cannot find a path

def dfs(start, target, word_list):
    #stack stores lost of path
    stack = [[start]]
    visited = set([start])

    while stack:
        path = stack.pop()
        curr_word = path[-1]

        if curr_word == target:
            print(f"DFS path: {'->'.join(path)}")  
            return len(path) -1
        
        for neighbour in get_neighbors(curr_word, word_list):
            if neighbour not in visited:
                visited.add(neighbour)
                stack.append(path+[neighbour])

    print("No path exists")
    return -1


if __name__ == "__main__":
    word_list = ["cold", "cord", "card", "ward", "warm",
    "bold", "bald", "dart", "tart", "pool"]
    
    start_word = "cold"
    target_word = "warm"

    print("Testing BFS:")
    bfs_res = bfs(start_word,target_word,  word_list)
    print(f"Total steps in BFS: {bfs_res}")


    print("\nTesting DFS:")
    dfs_res = dfs(start_word,target_word, word_list)
    print(f"Total steps in DFS: {dfs_res}")
        