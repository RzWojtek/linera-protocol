# <img src="https://github.com/linera-io/linera-protocol/assets/1105398/fe08c941-93af-4114-bb83-bcc0eaec95f9" width="250" height="90" />

[![License](https://img.shields.io/badge/license-Apache-green.svg)](LICENSE)
[![Build Status for Rust](https://github.com/linera-io/linera-protocol/actions/workflows/rust.yml/badge.svg)](https://github.com/linera-io/linera-protocol/actions/workflows/rust.yml)
[![Build Status for Documentation](https://github.com/linera-io/linera-protocol/actions/workflows/documentation.yml/badge.svg)](https://github.com/linera-io/linera-protocol/actions/workflows/documentation.yml)
[![Build Status for DynamoDB](https://github.com/linera-io/linera-protocol/actions/workflows/dynamodb.yml/badge.svg)](https://github.com/linera-io/linera-protocol/actions/workflows/dynamodb.yml)
<!-- [![Build Status for Kubernetes](https://github.com/linera-io/linera-protocol/actions/workflows/kubernetes.yml/badge.svg)](https://github.com/linera-io/linera-protocol/actions/workflows/kubernetes.yml) -->

# Linera Protocol

Linera is a decentralized blockchain infrastructure designed for highly scalable, low-latency Web3 applications.

Visit our [developer page](https://linera.io/developers) and read our [whitepaper](https://linera.io/whitepaper) to learn more about the Linera protocol.

---

## Repository Structure

The main crates and directories of this repository are organized as follows (listed from low to high levels in the dependency graph):

- **linera-base**: Base definitions, including cryptography.
- **linera-version**: A library to manage version info in binaries and services.
- **linera-views**: A library mapping complex data structures onto a key-value store.
- **linera-views-derive**: Procedural macros for `linera-views`.
- **linera-execution**: Persistent data and logic for runtime and execution of Linera applications.
- **linera-chain**: Persistent data and logic for chains of blocks, certificates, and cross-chain messaging.
- **linera-storage**: Defines storage abstractions for the protocol on top of `linera-chain`.
- **linera-core**: The core Linera protocol, including client and server logic, node synchronization, etc.
- **linera-rpc**: Defines RPC message data types and tracks corresponding data schemas.
- **linera-client**: Library for writing Linera clients (CLI wallets, node services, Web clients).
- **linera-service**: Executable for clients, proxy, and servers.
- **linera-sdk**: Library to develop Linera applications in Rust for the Wasm virtual machine.
- **linera-sdk-derive**: Procedural macros for `linera-sdk`.
- **examples**: Examples of Linera applications written in Rust.

---

## Quickstart with the Linera Service CLI

The following commands set up a local test network and run some transfers between the microchains owned by a single wallet.

### Step 1: Compile the Linera Binaries
Make sure to compile the Linera binaries and add them to your `$PATH`:
```bash
cargo build -p linera-storage-service -p linera-service --bins --features storage-service
export PATH="$PWD/target/debug:$PATH"

Step 2: Set Up the Local Test Network

Import the optional helper function linera_spawn_and_read_wallet_variables and start the network:
bash
Copy

source /dev/stdin <<<"$(linera net helper 2>/dev/null)"
linera_spawn_and_read_wallet_variables linera net up

Step 3: Query Validators and Balances

Print the set of validators and query the chain balances:
bash
Copy

linera query-validators

CHAIN1="e476187f6ddfeb9d588c7b45d3df334d5501d6499b3f9ad5595cae86cce16a65"
CHAIN2="69705f85ac4c9fef6c02b4d83426aaaf05154c645ec1c61665f8e450f0468bc0"
linera query-balance "$CHAIN1"
linera query-balance "$CHAIN2"

Step 4: Perform Transfers

Transfer 10 units from CHAIN1 to CHAIN2, then 5 units back:
bash
Copy

linera transfer 10 --from "$CHAIN1" --to "$CHAIN2"
linera transfer 5 --from "$CHAIN2" --to "$CHAIN1"

Step 5: Verify Balances

Query the balances again to confirm the transfers:
bash
Copy

linera query-balance "$CHAIN1"
linera query-balance "$CHAIN2"

More Examples

For more complex examples, check out our developer manual and the example applications in this repository.
Contributing

We welcome contributions! If you'd like to contribute to the Linera protocol, please read our Contribution Guidelines.
License

This project is licensed under the Apache License 2.0.
