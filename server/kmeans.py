# how kmeans works: K-means clustering is an unsupervised machine learning algo that partitions dataset into k clusters, tying to make objects in the cluster as similar as possible

import numpy as np

def kmeans(X, k=3, max_iter=50):
    # Initialize randomly select k points from X as initial centroids
    n = len(X)
    rng = np.random.default_rng()
    centroids = X[rng.choice(n, k, replace=False)]

    for _ in range(max_iter):
        # Assign each point to nearest centroid
        d = np.linalg.norm(X[:, None] - centroids, axis=2)
        labels = np.argmin(d, axis=1)

        # Update centroids as mean of assigned points
        new_centroids = []
        for i in range(k):
            pts = X[labels == i]
            if len(pts) > 0:
                new_centroids.append(pts.mean(axis=0))
            else:
                new_centroids.append(centroids[i])
        new_centroids = np.array(new_centroids)

        # Converge when centroids stop changing
        if np.allclose(centroids, new_centroids):
            break
        centroids = new_centroids

    # Return cluster labels and final centroid positions
    return labels, centroids
