
const getNumChildren = (branches, index) => {
    if (index >= branches.length - 1) return 0;
    const curLevel = branches[index].level;
    if (branches[index+1].level <= curLevel) return 0;
    let count = 1;
    for (let i = index + 2; i < branches.length; ++i) {
        if (branches[i].level <= curLevel) return count;
        ++count;
    }

    return count;

}

export const insertBranch = (newBranch, siblingBranchId, branches) => {
    const siblingBranchIndex = branches.findIndex(branch => branch._id === siblingBranchId);
    if (siblingBranchIndex === -1) return;
    const numChildren = getNumChildren(branches, siblingBranchIndex);
    newBranch.level = curLevel;
    branches.splice(siblingBranchIndex + 1 + numChildren, 0, newBranch);
}