export type Stage = {
  auditSkipCount: number
  auditWaitForMarkCount: number
  dataSourceId: number
  finishedCount: number
  markingCount: number
  markingHandlingCount: number
  markingSkipCount: number
  totalCount: number
  unAuditCount: number
  waitForMarkCount: number
}
export type Tag = {
  clearCount: number
  firstAuditCorrectCount: number
  firstAuditCorrectRatio: string
  firstAuditTotalCount: number
  statisticMarkedCount: number
  statisticTime: number
  totalMarkedCount: number
  userName: string
}
export type Skip = {
  count: number
  userName: string
}

export type ReviewType = {
  allowNineRectGrid: boolean
  allowUserInputText: number
  data: Array<DataType>
  dataAccessWay: string
  dataType: string
  fullscreenShortKey: string
  isSingleSelection: boolean
  pageNo: number
  pageSize: number
  selectionType: number
  singleDataCount: number
  totalSize: number
}

export type DataType = {
  answers: Array<Answers>
  caption: string
  dataId: number
  defaultCategory: string
  isAtlas: false
  itemVoList: Array<ItemVoList>
  mediaEntityGroupList: Array<string>
  name: string
  reviewHistoryList: Array<string>
  reviewUser: string
}

// @ts-ignore
type ItemVoList = {
  answerGroup: string
  answerName: string
  dataSourceId: number
  defaultOption: number
  indexId: number
  intoReviewRatio: number
  intoReviewType: number
  isRequire: number
  isSelected: boolean
  itemColor: string
  itemId: number
  itemName: string
  shortCutKey: string
  subSelectionType: number
  uniqueGroup: number
}

// @ts-ignore
type Answers = {
  allowUserInputText: number
  answerGroup: string
  answerName: string
  filedShowMap: Object
  hasDefaultOption: number
  historyList: Array<string>
  historyVoList: []
  isSingleSelection: number
  itemShowType: string
  items: []
  resultLevelType: string
  reviewDisplay: []
  selectedItemIds: []
}
