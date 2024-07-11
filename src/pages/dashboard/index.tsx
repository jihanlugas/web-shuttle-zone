import CalendarTimeline from "@/components/calendar/calendar";
import MainAdmin from "@/components/layout/main-admin";
import ModalAddEvent from "@/components/modal/modal-add-event";
import PageWithLayoutType from "@/types/layout";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

interface Props {
}

const getDefaultItem = (len = 0) => {
  const items = []
  for (let i = 0; i < len; i++) {
    items.push(
      {
        id: i.toString(),
        groupId: (i % 5 + 1).toString(),
        name: 'Item ' + (i + 1),
        title: 'Title Item ' + (i + 1),
        start: moment().add((i * 2) - 20, 'hour'),
        end: moment().add((i * 2) - 18, 'hour'),
        status: 1,
        itemProps: {
          className: 'text-xs text-primary-500 bg-primary-200 text-ellipsis overflow-hidden border border-primary-500',
        }

      }
    )
  }
  return items
}

const defaultGroups = [
  { id: '1', name: 'Room 1001', tip: 'Tip Room 1001', stackItems: true },
  { id: '2', name: 'Room 1002', tip: 'Tip Room 1002', stackItems: true },
  { id: '3', name: 'Room 1003', tip: 'Tip Room 1003', stackItems: true },
  { id: '4', name: 'Room 1004', tip: 'Tip Room 1004', stackItems: true },
  { id: '5', name: 'Room 1005', tip: 'Tip Room 1005', stackItems: true },
];

const Index: NextPage<Props> = () => {

  const [items, setItems] = useState(getDefaultItem(20))
  const [groups, setGroups] = useState(defaultGroups)

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);

  const [addEventData, setAddEventData] = useState<any>({});

  const handleOnClickOrverlayAddEvent = () => {
    setAddEventData({})
    setShowModalAddEvent(!showModalAddEvent);
  }

  const handleOnItemClick = (itemId, e, time) => {
    console.log('handleOnItemClick ')
  }

  const handleOnItemSelect = (itemId, e, time) => {
    console.log('handleOnItemSelect ')
  }

  const handleOnItemMove = (itemId, dragTime, newGroupOrder) => {
    console.log('handleOnItemMove')
  }

  const handleOnCanvasClick = (itemId, dragTime, newGroupOrder) => {
    let eventTime = new Date(dragTime)



    setAddEventData({
      itemId,
      start_time: new Date(eventTime.setHours(eventTime.getHours(), 0, 0, 0)),
      end_time: new Date(eventTime.setHours(eventTime.getHours() + 1, 0, 0, 0)),
    })
    setShowModalAddEvent(true)
  }

  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta name="theme-color" content={'#FAF5FF'} />
      </Head>
      <ModalAddEvent
        onClickOverlay={handleOnClickOrverlayAddEvent}
        show={showModalAddEvent}
        data={addEventData}
      />
      <div className='p-4'>
        <div className='text-xl h-16 flex items-center border-b'>Dashboard</div>
        <div className='pt-4'>
          <CalendarTimeline
            items={items}
            groups={groups}
            onItemClick={handleOnItemClick}
            onItemSelect={handleOnItemSelect}
            onItemMove={handleOnItemMove}
            onCanvasClick={handleOnCanvasClick}
          />
        </div>
      </div>
    </>
  )
}

(Index as PageWithLayoutType).layout = MainAdmin;

export default Index;