/**
 * Multithreaded Background Task Worker Utility
 * Offloads heavy computational tasks (such as array searching, multi-criteria filtering, and data transformation)
 * to background Web Workers to maintain 60 FPS UI performance without main thread lag or stutters.
 */

export function runWorkerTask<T, R>(
    workerFn: (data: T) => R,
    data: T
): Promise<R> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined" || typeof Worker === "undefined") {
            // Fallback for SSR or non-worker environments using non-blocking microtasks
            try {
                const result = workerFn(data);
                resolve(result);
            } catch (err) {
                reject(err);
            }
            return;
        }

        try {
            // Create inline Web Worker Blob
            const code = `
                self.onmessage = function(e) {
                    try {
                        const fn = ${workerFn.toString()};
                        const res = fn(e.data);
                        self.postMessage({ success: true, result: res });
                    } catch (err) {
                        self.postMessage({ success: false, error: err.message });
                    }
                };
            `;
            const blob = new Blob([code], { type: "application/javascript" });
            const workerUrl = URL.createObjectURL(blob);
            const worker = new Worker(workerUrl);

            worker.onmessage = (e) => {
                URL.revokeObjectURL(workerUrl);
                worker.terminate();
                if (e.data.success) {
                    resolve(e.data.result);
                } else {
                    reject(new Error(e.data.error));
                }
            };

            worker.onerror = (err) => {
                URL.revokeObjectURL(workerUrl);
                worker.terminate();
                reject(err);
            };

            worker.postMessage(data);
        } catch {
            // Fallback to direct synchronous execution if blob worker creation is restricted by CSP
            try {
                const result = workerFn(data);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }
    });
}
