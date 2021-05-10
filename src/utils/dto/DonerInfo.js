const DonerInfo = (report) => {
    const data = [];
    for (let i = 0; i < report.length; i += 1) {
      const el = report[i];
      data.push({
        "name": el.user.name,
        "age": el.age,
        "bloodGroup": el.bloodGroup,
        "area": el.area,
      });
    }
    return data;
  };
  
  export default DonerInfo;