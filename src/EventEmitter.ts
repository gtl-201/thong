class Events {
  stacks = {} as { [key: string]: { key: string | number, callback: any }[] }; // Mảng lưu các callback dựa theo key
  addEvent = (key: string, callback: (...args: any[]) => any) => { // hàm thêm event vào stacks
    const id = new Date().getTime();
    if (this.stacks[key]) {
      this.stacks[key].push({ key: id, callback });
    } else {
      this.stacks[key] = [{ key: id, callback }];
    }
    return id;
  }
  emit = (key: string, ...args: any) => { // hàm để trigger và pass argument vào callback
    const callbackFuncs = this.stacks[key];
    if (callbackFuncs?.length) {
      callbackFuncs.forEach(e => {
        e.callback(...args);
      })
    }
  }

  removeEvent = (key: string, id: string | number) => { // tắt event khi unmount tránh lặp
    if (this.stacks[key]) this.stacks[key] = this.stacks[key].filter(e => e.key !== id)
  }
}

export const event = new Events();