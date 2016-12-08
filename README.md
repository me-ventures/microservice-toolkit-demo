# Microservice-toolkit-demo

Overview of services:


<img src="https://github.com/me-ventures/microservice-toolkit-demo/blob/master/docs/Demo-Setup.png" width="250">

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


## Using it

Add traefik service external ip to `/etc/hosts` under `articles.demo.com`

```bash
# list services
kubectl get svc

# should output something like this:
NAME                   CLUSTER-IP     EXTERNAL-IP     PORT(S)                       AGE
...
traefik-service        10.3.248.53    123.45.67.89    80/TCP                        2d

# /etc/hosts
123.45.67.89       articles.demo.com
```

.. then go to `articles.demo.com`

### Grafana

Port forward grafana pod

```bash
# list pods
kubectl get pods

kubectl port-forward <grafana-pod> <local-port>:3000
```

.. then view grafana at `localhost:<local-port>`

#### Add data sources

- add Graphite data source with address `http://graphite-service`
- add Prometheus data source with address `http://prometheus:9090`

#### Import Dashboards

Import optional dashboards located in the grafana directory of this repository: https://github.com/me-ventures/microservice-toolkit-demo/tree/master/grafana

### Service Mapping Tool

Port forward relationship mapper and relationship backend pods

```bash
# list pods
kubectl get pods

kubectl port-forward <relationship-mapper-pod> <local-port>:80
kubectl port-forward <relationship-backend-pod> 3000
```

.. then view the tool at `localhost:<local-port>`


