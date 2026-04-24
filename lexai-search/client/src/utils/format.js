export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium'
  }).format(new Date(value));

export const truncate = (value, length = 140) =>
  value?.length > length ? `${value.slice(0, length)}...` : value;

