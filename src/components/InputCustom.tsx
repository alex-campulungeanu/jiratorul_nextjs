import React from 'react'

import { Input } from '@mantine/core'

const InputCustom = () => {
  return (
    <Input 
      type="password"
      placeholder="password"
      required
      size="lg"
      styles={{
        input: {
          width: '100%',
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          padding: '20px',
          outline: 'none',
          borderRadius: '10px'
        }
      }}
      variant="headless"
    />
  )
}

export default InputCustom
