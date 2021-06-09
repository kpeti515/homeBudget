const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'LIST_BUDGET':
      return action.budgetList
    default:
      break;
  }
}

export { budgetReducer as default }