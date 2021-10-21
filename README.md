# mock backend service for NutritionPro

### Installation (without docker)
*node v7.6.0 or higher*
___
***Install dependencies***
```
yarn install
```

***On root (api) directory create a .env file***
```
nano .env

```

***Pass MONGO_URI inside the .env file***
```
MONGO_URI=mongodb://localhost:27017/fullstack_mock
```

***Start the service***
```
yarn start
```
___

### Installation (with docker)

*Make sure docker and make package are installed on your machine*
***Build docker image***
```
docker build -t fullstack_mock:0.0.1 .
```
***Run a container with created image. Notice, in Makefile already was write run comand for docker container***
```
make run
```

___

#### Used TDD (Test-driven Development) with EDA (Event-driven Architecture)
*for more information about stack, used libraries please look up on package.json*


