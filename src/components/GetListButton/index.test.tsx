import axios from 'axios'
import { render, waitFor } from '@testing-library/react'
import GetListButton from '.'

describe('GetListButton', () => {
  let getSpy: any
  beforeEach(() => {
    getSpy = jest.spyOn(axios, 'get').mockImplementation(async () => ({data: ['a', 'b']}))
  })
  it('renders a "Get List" button', () => {
    const { getByText } = render(<GetListButton addData={jest.fn()}/>)
    const button = getByText('Get List')
    expect(button.nodeName).toBe('BUTTON')
  })
  it('makes a get request to the "list" path when clicked', () => {
    const { getByText } = render(<GetListButton addData={jest.fn()}/>)
    const button = getByText('Get List')
    button.click()
    expect(getSpy.mock.calls[0][0]).toMatch('/list')
  })
  it('calls props.addData with result of call', async () => {
    const addDataSpy = jest.fn()
    const { getByText } = render(<GetListButton addData={addDataSpy} />)
    const button = getByText('Get List')
    button.click()
    await waitFor(() => expect(addDataSpy).toHaveBeenCalledWith(['a', 'b']))
  })
})