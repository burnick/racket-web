import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import PanelCard from 'components/PanelCard'

const SignIn = () => {
  const router = useRouter()
  const [secret] = (router.query.slug as string[]) || []

  return (
    <Container>
      <PanelCard title="Validating sign-in....">
        <p>Slug: {secret}</p>
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

export default SignIn
