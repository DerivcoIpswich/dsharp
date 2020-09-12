export enum TaskContinuationOptions {
  none = 0,
  preferFairness = 1,
  longRunning = 2,
  attachedToParent = 4,
  denyChildAttach = 8,
  hideScheduler = 16,
  lazyCancellation = 32,
  runContinuationsAsynchronously = 64,
  notOnRanToCompletion = 128,
  notOnFaulted = 256,
  notOnCanceled = 512,
  onlyOnRanToCompletion = 768,
  onlyOnFaulted = 640,
  onlyOnCanceled = 384,
  executeSynchronously = 1024
}