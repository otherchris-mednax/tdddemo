import { FC } from 'react'
import axios from "axios"

const buttonClick = async (handler: (data: Array<string>) => void) => {
  const data = await (await axios.get('fakeurl/list')).data
  handler(data) 
}

interface GetListButtonProps {
  addData: (data: Array<string>) => void
}

const GetListButton: FC<GetListButtonProps> = (props) => {
  const { addData } = props
  return (
    <button onClick={() => buttonClick(addData)}>Get List</button>
  )
}

export default GetListButton 