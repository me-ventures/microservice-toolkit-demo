# Microservice-toolkit-demo


## Dependencies

- kubectl (part of gcloud sdk)
- minikube or kubernetes cluster 

### Optional dependencies

- docker (for building service images)
- NodeJS
- Angular CLI tool (for building frontend)

## Quickstart

### Running it on minikube

```bash
git clone git@github.com:me-ventures/microservice-toolkit-demo.git
```

Start the minikube cluster with the following command:

```bash
minikube start
```

Kubectl will be automatically setup to connect to the local minikube cluster. 


### Running it GKE (Google Container Engine)

To get credentials you can use the gcloud sdk:

```bash
# List clusters
gcloud container clusters list
gcloud container clusters get-credentials <CLUSTER_NAME>
```

Now you should be connected to the Kubernetes cluster.


### Deploying the services

We first deploy the rabbitmq service.

```bash
# from project directory
kubectl apply -f infra/rabbitmq.yml
```

Before deploying the other services we have to wait until the rabbitmq service is running. You check that by using the `kubectl get pods --watch`. Wait until the rabbitmq pod is in running status.

Now we can deploy the rest of the services. This command will apply all the infrastructure files in the directory (not recursive).

```bash
# from project directory
kubectl apply -f infra/
```

You can watch the pods again and wait until they are all have the running status. This can take a couple minutes.