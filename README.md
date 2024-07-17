# WunderGraph Federation Demo

This repository provides a comprehensive demonstration of using WunderGraph to manage GraphQL Microservices with Apollo Federation. By leveraging WunderGraph, you can introspect your federated SubGraphs, automatically compose a SuperGraph, and integrate it into your API dependencies seamlessly, all without any additional dependencies.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Example](#running-the-example)
6. [Environment Variables](#environment-variables)
7. [Learn More](#learn-more)

## Overview

WunderGraph simplifies the management of GraphQL Microservices by automating the introspection and composition of federated SubGraphs. This demo showcases how to set up and run a federated GraphQL architecture using WunderGraph and Apollo Federation.

## Features

- **Automatic Introspection:** WunderGraph introspects your federated SubGraphs effortlessly.
- **SuperGraph Composition:** Automatically composes a SuperGraph from your SubGraphs.
- **Dependency Management:** Integrates the composed SuperGraph into your API dependencies without extra dependencies.
- **Seamless Integration:** Easily integrates with existing Apollo Federation setups.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

## Installation

To set up the demo, clone the repository and install the necessary dependencies:

```shell
git clone https://github.com/yourusername/wundergraph-federation-demo.git
cd wundergraph-federation-demo
npm install
```

## Running the Example

To run the complete example, execute the following command:

```shell
npm start
```

This command will start the server, introspect the federated SubGraphs, compose the SuperGraph, and integrate it into your API dependencies.

## Environment Variables

This demo requires the following environment variables to be set. Create a `.env` file in the root directory of your project and add the following variables:

```
SHOPIFY_ACCESS_TOKEN=
GOOGLE_CLIENT_SECRET=
```

These variables are necessary for accessing external services used within the demo. Make sure to replace the example values with your actual credentials.

## Learn More

For more detailed information, refer to the official WunderGraph documentation:

- [WunderGraph Documentation](https://wundergraph.com/docs)

Explore the docs to gain a deeper understanding of WunderGraph's capabilities and how to utilize them effectively in your projects.

---

By following the steps and leveraging the features provided in this demo, you can efficiently manage your GraphQL Microservices using WunderGraph and Apollo Federation. If you have any questions or need further assistance, feel free to reach out via the [issue tracker](https://github.com/yourusername/wundergraph-federation-demo/issues).

Happy coding!