export interface Branch {
  branchId: number;
}

export interface ResponseBranch {
  success: boolean;
  message: string;
  data: [{ branches: Branch[] }];
}

export interface BranchFilter {
  branches: string;
  date: string;
}
