const HospitalInfo = (report) => {
    const data = [];
    for (let i = 0; i < report.length; i += 1) {
      const el = report[i];
      data.push({
        "_id": el._id,
        "name": el.user.name,
        "phone": el.user.phone,
        "documents": el.documents,
      });
    }
    return data;
  };
  
  export default HospitalInfo;