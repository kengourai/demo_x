import { request } from 'http'
import { createServer } from 'miragejs'
import IdentityManager from 'miragejs/identity-manager'
import { runInThisContext } from 'vm'

import mockapi from './../resource/mockapi.json'
import treeData from './../resource/treeData.json'
import treeSideData from './../resource/TreeSideBar.json'
import psData from './../resource/productSuite.json'
import myevent from './../resource/myevent.json'

export function MockServer({ environment = 'test' }) {
  console.log('start mock server')
  return createServer({
    routes() {
      this.post('/api', (schema, request) => ({
        responseCheck: request.requestBody,
      }))
      /*
            this.get("/api", (schema,request) => ({
                apiId: JSON.parse(request.queryParams.id).id,
                api: mockapi,
            }))*/
      this.get('/v1/myevent', () => myevent)
      this.get('/v1/aapi/:id', (schema, request) => ({
        id: request.params.id,
        title: 'test_api_name',
        productSuite: 'NTAP_test',
        aapiOwner: 'LCLIAOB',
        doc_json: mockapi,
        subscriber: ['test1', 'test2'],
        createdAt: '2021-06-08 08:00:10',
        updatedAt: '2021-06-08 13:22:17',
      }))
      this.get('/ps', () => ({
        root: treeData['root'],
      }))
      this.get('/v1/login', () => ({
        account: "LCLIAOB",
        state: "login"
      }))
      this.get('/subject-list', () => ({
        root: treeSideData['root'],
      }))
      this.get('/v1/productsuite', () => psData)
    },
  })
}
