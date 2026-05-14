import heapq


def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min = i
        for j in range(i,n):
            if arr[j] < arr[min]:
                min = j
            
        arr[i], arr[min] = arr[min], arr[i]

def job_scheduler(deadlines, priorities):
    job_pairs = sorted(zip(deadlines, priorities))
    pq = []

    for deadline, priority in job_pairs:
        if deadline > len(pq):
            heapq.heappush(pq, priority)
        elif pq and pq[0] < priority:
            heapq.heappop(pq)
            heapq.heappush(pq, priority)
    jobs_done = len(pq)
    max_priority = sum(pq)

    return [jobs_done, max_priority]


def prims(V, adj):
    #stores (weight, node), start with 0,0
    pq=[(0,0)]
    visited = [False]*V
    res = 0 
    mst = []

    while pq:
        #pop least weight
        w,u = heapq.heappop(pq)

        if visited[u]:
            continue
            
        mst.append(u)
        visited[u] = True
        res+=w

        #check all adjacent nodes to u:
        for v in range(V):
            if adj[u][v]!=0 and visited[v]!=True:
                heapq.heappush(pq, (adj[u][v], v))

    print(f"MST using Prims: {" ".join(map(str,mst))}")
    print(f"Minimum distance: {res}")
    return res


if __name__=="__main__":
    arr=[12,56,1,72,65]
    selection_sort(arr)
    print(" ".join(map(str,arr)))

    deadlines_Arr = [1,2,2,2,3]
    priorities_Arr = [50,10,60,30,40]
    job_res = job_scheduler(deadlines_Arr, priorities_Arr)
    print(f"Total jobs scheduled: {job_res[0]}")
    print(f"Total priority achieved: {job_res[1]}")


    V = 5
    adj = [[0]*V for i in range(V)]

    edges = [(0, 1, 2),
        (0, 3, 6),
        (1, 2, 3),
        (1, 3, 8),
        (1, 4, 5),
        (2, 4, 7),
        (3, 4, 9)] 
    
    for l1, l2, wt in edges:
        adj[l1][l2] = wt
        adj[l2][l1] = wt
    prims(V, adj)