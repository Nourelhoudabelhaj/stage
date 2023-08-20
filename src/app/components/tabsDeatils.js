import React from 'react';
import {Collapse, Tabs} from 'antd';
import TabPane from "antd/es/tabs/TabPane";
import DetailImport from "@/app/components/DetailImport";
import DetailExport from "@/app/components/DetailExport";
const onChange = (key) => {
    console.log(key);
};
const { Panel } = Collapse;

const TabsDetails = ({ event }) => (

    <Tabs  onChange={onChange}>
        <TabPane tab="تفاصيل" key={event.id}>
            {
                event.type === "Imports" ? <DetailImport values={event} /> : <DetailExport values={event} />
            }
        </TabPane>

        <TabPane tab={"اعادتها "+event.reply.length} key={2} >
            {
                event.reply.map((item)=>{
                    return (
                        <Collapse className={" my-4"}>
                            <Panel header={item.title} key={item.id}>
                                <h3 >{item.title}</h3>
                                <p>{item.type}</p>
                                <p>{item.start}</p>
                                <p>{item.end}</p>
                                <p>{item.completed ? "completed" : "Not Completed"}</p>
                            </Panel>
                        </Collapse>
                    )
                })
            }
        </TabPane>
    </Tabs>


);

export default TabsDetails;