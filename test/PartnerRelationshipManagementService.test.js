const cds = require('@sap/cds')

const { GET, POST, expect, defaults } = cds.test (__dirname+'/..')

describe('PartnerRelationshipManagementService OData APIs', () => {

  it('serves PartnerRelationshipManagementService.Partner', async () => {
    const { data } = await GET `/service/PartnerRelationshipManagementService/Partner ${{ params: { $select: 'ID,PartnerNumber' } }}`
    expect(data.value).to.containSubset([
      {"ID":"20820969-631a-4db5-a5a3-3d5ebe44f547","PartnerNumber":18},
    ])
  })

})
