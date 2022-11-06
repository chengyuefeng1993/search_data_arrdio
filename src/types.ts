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
