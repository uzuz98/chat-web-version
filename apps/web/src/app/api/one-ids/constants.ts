export const OneIdRead = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'controller',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes'
          }
        ],
        internalType: 'struct IRegistrarController.DomainInfoParams[]',
        name: 'datas',
        type: 'tuple[]'
      },
      {
        internalType: 'bytes32',
        name: 'refferal',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address'
      }
    ],
    name: 'adminRegisterTotalPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'names',
        type: 'string[]'
      },
      {
        internalType: 'address[]',
        name: 'registars',
        type: 'address[]'
      }
    ],
    name: 'available',
    outputs: [
      {
        internalType: 'bool[]',
        name: '',
        type: 'bool[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'nodes',
        type: 'bytes32[]'
      },
      {
        internalType: 'address[]',
        name: 'resolvers',
        type: 'address[]'
      }
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'oracles',
        type: 'address[]'
      }
    ],
    name: 'oraclePrice',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'price',
            type: 'int256'
          },
          {
            internalType: 'uint8',
            name: 'decimals',
            type: 'uint8'
          }
        ],
        internalType: 'struct OneIDRead.tokenOracle[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'nodes',
        type: 'bytes32[]'
      },
      {
        internalType: 'address[]',
        name: 'registries',
        type: 'address[]'
      }
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'controller',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes'
          }
        ],
        internalType: 'struct IRegistrarController.DomainInfoParams[]',
        name: 'datas',
        type: 'tuple[]'
      },
      {
        internalType: 'bytes32',
        name: 'refferal',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address'
      }
    ],
    name: 'postOrderTotalPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'controller',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes'
          }
        ],
        internalType: 'struct IRegistrarController.DomainInfoParams[]',
        name: 'datas',
        type: 'tuple[]'
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address'
      }
    ],
    name: 'preOrderTotalPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'controller',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes'
          }
        ],
        internalType: 'struct IRegistrarController.DomainInfoParams[]',
        name: 'datas',
        type: 'tuple[]'
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address'
      }
    ],
    name: 'renewTotalPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'controller',
            type: 'address'
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'extra',
            type: 'bytes'
          }
        ],
        internalType: 'struct IRegistrarController.DomainInfoParams[]',
        name: 'datas',
        type: 'tuple[]'
      },
      {
        internalType: 'address[]',
        name: 'priceConfigs',
        type: 'address[]'
      },
      {
        internalType: 'bytes32',
        name: 'refferal',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address'
      }
    ],
    name: 'registerCrossChainTotalPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

export const ONEID_READ_CONTRACT = '0x2B8BE91659b669f1acf57350a81489d0c1Fa0c9b' // new

export const TYPE_EXPIRE = {
  EXPIRE_PERIOD: 'expirePeriod',
  EXPIRE: 'expire',
  EXPIRED: 'expired'
}