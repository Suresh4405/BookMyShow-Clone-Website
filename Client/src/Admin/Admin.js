import React from "react";
import { Tabs } from "antd";
 import Moviepage from "./Movies/Moviepage"
 import Showtheaterlist from "./Theaters/Showtheaterlist"


function Admin() {
  return (
    <div>
      <h1>Admin</h1>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
            <Moviepage/>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
            <Showtheaterlist/>
           
        </Tabs.TabPane>
       
      </Tabs>
    </div>
  );
}

export default Admin;