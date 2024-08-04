import moment from "moment";
import { NextPage } from "next";
import { useState } from "react";
import Timeline, { TimelineProps, TimelineHeaders, SidebarHeader, DateHeader, TimelineMarkers, TodayMarker } from 'react-calendar-timeline';

interface Props extends TimelineProps {
  items: any[];
  groups: any[];
  defaultTimeStart?: moment.Moment;
  defaultTimeEnd?: moment.Moment;
  sidebarWidth?: number;
  lineHeight?: number;
  minZoom?: number;
  maxZoom?: number;
  onItemClick?: (itemId, e, time) => void;
  onCanvasClick?: (groupId, time, e) => void;
  onBoundsChange?: (canvasTimeStart, canvasTimeEnd) => void;
  onItemMove?: (itemId, dragTime, newGroupOrder) => void;
  onItemSelect?: (itemId, e, time) => void;
  onItemResize?: (itemId, time, edge) => void;
}

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'name',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'name',
  itemDivTitleKey: 'description',
  itemGroupKey: 'groupId',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}


const CalendarTimeline: NextPage<Props> = ({
  items,
  groups,
  defaultTimeStart = moment().add(12 * -1, 'hour'),
  defaultTimeEnd = moment().add(12 * 1, 'hour'),
  // sidebarWidth = 200,
  // lineHeight = 40,
  // minZoom = 1000 * 60 * 60 * 4, // 4 jam 
  // maxZoom = 1000 * 60 * 60 * 24 * 3, // 3 hari
  // onItemClick,
  // onCanvasClick,
  // onBoundsChange,
  // onItemMove,
  // onItemSelect,
  // onItemResize,
  ...props
}) => {

  const ItemRenderer = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    const itemprops = getItemProps(item.itemProps)

    return (
      <div
        {...itemprops}
        style={{
          cursor: itemprops.style.cursor,
          zIndex: itemprops.style.zIndex,
          position: itemprops.style.position,
          boxSizing: itemprops.style.boxSizing,
          top: itemprops.style.top,
          left: itemprops.style.left,
          lineHeight: itemprops.style.lineHeight,
          width: itemprops.style.width,
          height: itemprops.style.height,
        }}
        className={`${itemprops.className} ${itemContext.selected ? ' !bg-orange-200 border-r-4 !border-orange-500 !text-orange-500' : ''}`}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
      </div>
    )
  }


  const GroupRenderer = ({ group }) => {
    return (
      <div className="">
        <div className="title">{group.name}</div>
        {/* <div className="">{group.tip}</div> */}
      </div>
    )
  }

  return (
    <Timeline
      keys={keys}
      itemRenderer={ItemRenderer}
      groupRenderer={GroupRenderer}
      groups={groups}
      items={items}
      // minZoom={minZoom}
      // maxZoom={maxZoom}
      // lineHeight={lineHeight}
      // sidebarWidth={sidebarWidth}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      // onItemClick={onItemClick}
      // onCanvasClick={onCanvasClick}
      // onBoundsChange={onBoundsChange}
      // onItemMove={onItemMove}
      // onItemSelect={onItemSelect}
      // onItemResize={onItemResize}
      {...props}
    >
      <TimelineMarkers>
        <TodayMarker />
      </TimelineMarkers>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div {...getRootProps()} className='relative flex justify-center items-center text-2xl text-gray-50'>
                <div>{'Timeline'}</div>
                {/* <AiOutlineLoading3Quarters className={`absolute right-4 animate-spin ${!props.isLoading && ' hidden'}`} size={'1em'} /> */}
              </div>
            )
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  )
}

export default CalendarTimeline;