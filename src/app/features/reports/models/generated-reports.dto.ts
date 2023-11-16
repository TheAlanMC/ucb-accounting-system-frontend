export interface DateTime {
    date: number;
    day: number;
    hours: number;
    minutes: number;
    month: number;
    nanos: number;
    seconds: number;
    time: number;
    timezoneOffset: number;
    year: number;
}

export interface ReportType {
    reportName: string;
    reportTypeId: number;
}

export interface User {
    companyIds: number[];
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    s3ProfilePictureId: number;
}

export interface ReportData {
    dateTime: DateTime;
    isFinancialStatement: boolean;
    reportDescription: string;
    reportId: number;
    reportType: ReportType;
    user: User;
}

