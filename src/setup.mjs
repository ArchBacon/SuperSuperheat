export function setup(ctx) {
    ctx.onCharacterLoaded(ctx => {
        window.bars = {};

        // Save all bars to an object with original levels stored
        game.smithing.actions.forEach(action => {
            if (action._localID.includes("Bar")) {
                bars[action._localID] = {
                    action: action,
                    originalLevel: action.level
                };
            }
        });

        // On clicked Alt. Magic
        let MagicItem = sidebar.category('Non-Combat').item('melvorD:Magic');
        MagicItem.itemEl.addEventListener('click', UnlockAllBars)

        // On clicked Smithing
        let SmithingItem = sidebar.category('Non-Combat').item('melvorD:Smithing');
        SmithingItem.itemEl.addEventListener('click', RestoreAllBarLevels)
    });
}

// Set all smithing bars level requirement to level 1.
// This unlocks all the bars in smithing and alt magic's superheat spells
function UnlockAllBars() {
    Object.entries(bars).forEach(([key, barData]) => {
        barData.action.level = 1; // Unlock all bars by setting level to 1
    });
}

function RestoreAllBarLevels() {
    Object.entries(bars).forEach(([key, barData]) => {
        barData.action.level = barData.originalLevel; // Restore to original level
    });
    let SmithingItem = sidebar.category('Non-Combat').item('melvorD:Smithing').click();
}