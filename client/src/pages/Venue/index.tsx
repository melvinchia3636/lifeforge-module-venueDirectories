import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import { GoBackButton, Tabs, WithQuery } from 'lifeforge-ui'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'shared'

import FloorPlan from './components/Floorplan'
import Header from './components/Header'
import Shops from './components/Shops'

function Venue() {
  const navigate = useNavigate()

  const { id } = useParams()

  const validationQuery = useQuery(
    forgeAPI.venueDirectories.venues.validate
      .input({ id: id || '' })
      .queryOptions()
  )

  const venueMetaDataQuery = useQuery(
    forgeAPI.venueDirectories.venues.getById
      .input({ id: id || '' })
      .queryOptions({
        enabled: !!validationQuery.data
      })
  )

  const [selectedTab, setSelectedTab] = useState<'shops' | 'floorPlans'>(
    'shops'
  )

  useEffect(() => {
    if (validationQuery.isSuccess && !validationQuery.data) {
      toast.error('Venue not found.')
      navigate('/venue-directories')
    }
  }, [validationQuery.isSuccess, validationQuery.data, navigate])

  return (
    <>
      <GoBackButton
        onClick={() => {
          navigate('/venue-directories')
        }}
      />
      <WithQuery query={venueMetaDataQuery}>
        {venueMetaData => (
          <>
            <Header metadata={venueMetaData} />
            <Tabs
              active={selectedTab}
              className="mb-4"
              enabled={['floorPlans', 'shops']}
              items={[
                {
                  id: 'shops',
                  name: 'Shops',
                  amount: 0,
                  icon: 'tabler:building-store'
                },
                {
                  id: 'floorPlans',
                  name: 'Floor Plans',
                  icon: 'tabler:map'
                }
              ]}
              onNavClick={setSelectedTab}
            />
            {selectedTab === 'shops' && <Shops />}
            {selectedTab === 'floorPlans' && <FloorPlan />}
          </>
        )}
      </WithQuery>
    </>
  )
}

export default Venue
