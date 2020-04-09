import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';

interface DatePoint {
  data: string,
  status: string,
  statusB: string,
  statusE: string
}

// const EXAMPLE = [
//   {
//     data: "2019-12-05",
//     status: "status",
//     statusB: "Admission Start",
//     statusE: "Admission Open"
//   },
//   {
//     data: "2020-01-21",
//     status: "status",
//     statusB: "Start 1st round",
//     statusE: "Open for Fillup"
//   },
//   {
//     data: "2020-02-25",
//     status: "status",
//     statusB: "Start 2nd round",
//     statusE: "process"
//   },
// ];

interface IProps {
  // dates: Array<DatePoint>
  dates: any;
}

interface IState {
  curIdx: number;
  prevIdx: number;
}

export default class Timeline extends React.Component<IProps, IState> {
    
  constructor(props: IProps) {

    super(props);

    this.state = {
      curIdx: 0,
      prevIdx: -1
    };

  }

  render() {

    const { curIdx, prevIdx } = this.state;
    const curStatus = this.props.dates[curIdx].statusB;
    const prevStatus = prevIdx >= 0 ? this.props.dates[prevIdx].statusB : "";

    return (
      <div>
        <div
          style={{
            width: "80%",
            height: "100px",
            margin: "0 auto",
            marginTop: "20px",
            fontSize: "15px"
          }}
        >
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}

            index={this.state.curIdx}
            indexClick={(index: number) => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
            }}

            values={this.props.dates.map((x: DatePoint) => x.data)}

          />
        </div>
        <div className="text-center">
          {/* Prevoius:-{prevStatus} - Current Select:-{curStatus} */}
          {curStatus}
        </div>
      </div>
    );
  }
}
