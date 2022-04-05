export const defaultCode = {
  java: `import lhk.life.kunpeng.entity.BaseRule;
  import org.jeasy.rules.annotation.Action;
  import org.jeasy.rules.annotation.Condition;
  import org.jeasy.rules.annotation.Fact;
  import org.jeasy.rules.annotation.Rule;
  import java.util.Map;
  
  @Rule(name = "", description = "")
  public class AddRule extends BaseRule {
  
      @Condition
      public boolean check(@Fact("params") Map params) {
  
          return true;
      }
  
      @Action
      public void action() {
  
      }
  }
  `,
};
