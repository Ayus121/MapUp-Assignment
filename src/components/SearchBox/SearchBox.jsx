import { AudioOutlined } from '@ant-design/icons';
import { Input, Space,Button,Avatar, List } from 'antd';
import React, { useState } from 'react';
import L from 'leaflet'


const { Search } = Input;
const NOMINATISM_URL = 'https://nominatim.openstreetmap.org/search?';

// const onSearch = (value) => console.log(value);
const SearchBox = (props) => {
	const [searchText,setSearchText] = useState("");
	const [listPlace,setListPlace] = useState([]);
	const {selectPosition,setSelectPosition} = props;

	const suffix = (
		<AudioOutlined
		  style={{
			fontSize: 16,
			color: '#1677ff',
		  }} 
		/>
	  );
	return(
	<>
  <Space direction="row">
    <Input placeholder='Search location here...' value={searchText} onChange={(event)=>{
		setSearchText(event.target.value)
	  }}/>
    <Button
      type='primary'
	  onClick={()=>{
		const params ={
			q:searchText,
			format:'json',
			addressdetails:1,
			polygon_geojson:0
		}
		const queryString = new URLSearchParams(params).toString();
		// console.log(queryString)
		const requestOptions = {
			method:"GET",
			redirect:"follow"
		};
		fetch(`${NOMINATISM_URL}${queryString}`,requestOptions)
		.then((response)=>response.text())
		.then((result)=>{
			// console.log(JSON.parse(result))
			setListPlace(JSON.parse(result))
		})
		.catch((err)=>console.log("Error: "+err))
	  }}
    >Search</Button>
  </Space>
  <List 
  itemLayout="horizontal"
  dataSource={listPlace}
  renderItem={(item, index) => (
	<List.Item onClick={()=>{
		setSelectPosition(item);
	}}>
	  <List.Item.Meta
		avatar={<Avatar src='./location.png' />}
		title={item?.display_name}
	  />
	</List.Item>
  )}
/>
</>
)};
export default SearchBox;