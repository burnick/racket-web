import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'

interface CardProps {
  title: string
  width?: number
  children: React.ReactNode
}

const PanelCard = ({ title, width = 500, children }: CardProps) => {
  return (
    <StyledCard title={title} bordered={false} width={width}>
      {children}
    </StyledCard>
  )
}

const StyledCard = styled(Card)<{ width: number }>`
  width: ${({ width }) => width}px;
`

export default React.memo(PanelCard)
