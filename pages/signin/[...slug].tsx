import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import PanelCard from 'components/PanelCard'

const SignIn = () => {
  const router = useRouter()
  const [signId] = (router.query.slug as string[]) || []

  return (
    <Container>
      <PanelCard title="Validating sign-in....">
        <p>Slug: {signId}</p>
      </PanelCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
`

export default React.memo(SignIn)
