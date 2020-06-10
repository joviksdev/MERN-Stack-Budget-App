import React from 'react';

const BudgetForm = () => {
  return (
    <form>
      <div className='form-group'>
        <label htmlFor='budget'>Budget</label>
        <input type='text' name='budget' placeholder='Enter your budget' />
      </div>
      <input type='submit' value='Enter' />
    </form>
  );
};

export default BudgetForm;
