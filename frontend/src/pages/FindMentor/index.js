import React from "react"
import '../../assets/search.css'
import {DataSearch, ReactiveBase, ReactiveList, ResultList, SelectedFilters, SingleRange, RangeSlider, MultiDataList, DateRange} from '@appbaseio/reactivesearch';

const { ResultListWrapper } = ReactiveList;

const FindMentorPage = () => (

    // Wrapper for mentor page
    <div className="main-container">
        <ReactiveBase
            app="users" // Name of index
            url="http://localhost:9200"
            theme={
                {
                    typography: {
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        fontSize: '16px',
                    },
                    colors: {
                        titleColor: '#c7d5e0',
                        textColor: '#c7d5e0',
                        backgroundColor: '#212121',
                        primaryColor: '#CC9900',
                    }
                }
            }
        >
            {/* Search Bar */}
            <DataSearch
                componentId="title"
                dataField={["name"]}
                queryFormat="and"
                placeholder="Search mentor"
                showIcon={true}
                title=""
                className="data-search"
                innerClass={{
                    input: 'input',
                    list: 'list',
                }}
            />

            {/* Search Result list */}
            <div className="result-container">
                <ReactiveList
                    defaultQuery={() => ({ track_total_hits: true })}
                    componentId="resultLists"
                    dataField="name"
                    size={25}
                    pagination={true}
                    react={{
                        "and": [
                            "name"
                        ]
                    }}
                    className="result-list"
                    innerClass={{
                        resultsInfo: "resultsInfo",
                        resultStats: "resultStats",
                    }}
                >
                    
                    {({data}) => (
                        <ResultListWrapper>
                            {
                                data.map(item => (
                                    <ResultList key={item._id} className="listItem">
                                        <ResultList.Image className="image" src={item.profile_image}/>
                                        <ResultList.Content>
                                            <ResultList.Title
                                                dangerouslySetInnerHTML={{
                                                    __html: item.name
                                                }}
                                            />
                                            <ResultList.Description>
                                            <p className="mail">{item.email}</p><p className="comment">{item.comment}</p>
                                            </ResultList.Description>
                                        </ResultList.Content>
                                    </ResultList>
                                ))
                            }
                        </ResultListWrapper>
                    )}
                </ReactiveList>
            </div>
        </ReactiveBase>
    </div>
)

export default FindMentorPage