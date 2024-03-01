import React from 'react';
import Booking from './Booking';
import { Tabs } from "antd";
import Theatrepage from './Theatrepage';

const User = () => {
    return (
        <div>
              <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Booking" key="1">
            <Booking/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Apply for theatre" key="2">
            <Theatrepage/>
           
        </Tabs.TabPane>
       
      </Tabs>
        </div>
    );
}

export default User;
