a. run nats as Docker image `nats-streaming`

b. port forward to localhost 
kubectl get pods
kubectl port-forward nats-depl-69f7f7dd66-pg2qn 4222:4222

c. use `publish` & `listen`
