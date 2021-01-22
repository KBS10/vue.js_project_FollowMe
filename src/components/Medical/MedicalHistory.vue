<template>
  <div class="MedicalHistory">
      <h2>진료 내역</h2>
      <div class="medicalhistory_historyHeader">
        <input class="medicalhistory_date" type="Date">
         진료 여부

        <div class="mdeicalhistory_choose">
         <input type="radio" id="history_radioTotal">
         <label for="history_radioTotal">전체</label>
         <input type="radio" id="history_radioComplete">
         <label for="history_radioComplete">완료</label>
         <input type="radio" id="history_radioWait">
         <label for="history_radioWait">대기</label>
        </div>
      </div>

  <table class="medicalhistory_table">
    <th>
      <td>환자번호</td>
      <td>성명</td>
      <td>진료과목</td>
      <td>진료실</td>
      <td>담당의사</td>
      <td>시간</td>
      <td>진료현황</td>
      <td>진료종료</td>
   </th>

    <tr>
    </tr>
  </table>

  </div>
</template>

<script>
export default {};
</script>
