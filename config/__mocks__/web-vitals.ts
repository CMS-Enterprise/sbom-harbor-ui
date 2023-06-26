type ReportHandler = (onReport: unknown, opts?: unknown | undefined) => void

export const onCLS = jest.fn<void, Parameters<ReportHandler>>()
export const onFID = jest.fn<void, Parameters<ReportHandler>>()
export const onFCP = jest.fn<void, Parameters<ReportHandler>>()
export const onINP = jest.fn<void, Parameters<ReportHandler>>()
export const onLCP = jest.fn<void, Parameters<ReportHandler>>()
export const onTTFB = jest.fn<void, Parameters<ReportHandler>>()
